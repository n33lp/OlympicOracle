from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from .startup_script import df_medals, most_gold_medals, most_silver_medals, most_bronze_medals, pair_dict, model, le_country, le_discipline, le_event, le_medal

@api_view(['GET'])
def root(request):
    """
    Root endpoint to check if the API is running.
    """
    return Response({"message": "Hello World"})

@api_view(['POST'])
def bysport(request):
    """
    Endpoint to predict the next country to win in a specified sport.
    """
    data = request.data
    sport = data.get('sport')
    subsport = data.get('subsport')
    medalType = data.get('medalType').upper()  # Ensuring the medal type is in uppercase

    if not sport or not subsport or not medalType:
        return Response({"detail": "Missing sport, subsport or medalType fields."}, status=status.HTTP_400_BAD_REQUEST)
    
    if sport not in pair_dict or subsport not in pair_dict[sport]:
        return Response({"detail": "Invalid sport or subsport."}, status=status.HTTP_400_BAD_REQUEST)

    predicted_country = predictedsport(medalType, sport, subsport)
    return Response({"message": predicted_country})

@api_view(['POST'])
def bycountry(request):
    """
    Endpoint to predict the next country to win the most medals of a specified type.
    """
    medalType = request.data.get('medalType', '').upper()

    if medalType not in ['GOLD', 'SILVER', 'BRONZE']:
        return Response({"detail": "Invalid medal type. Choose from 'gold', 'silver', or 'bronze'."}, status=status.HTTP_400_BAD_REQUEST)

    if medalType == 'GOLD':
        predicted_country = predictedcountry(most_gold_medals)
    elif medalType == 'SILVER':
        predicted_country = predictedcountry(most_silver_medals)
    else:  # 'BRONZE'
        predicted_country = predictedcountry(most_bronze_medals)

    return Response({"message": predicted_country})

@api_view(['GET'])
def getsports_all(request):
    """
    Endpoint to get all sports with their corresponding subsports.
    """
    return Response({"disciplines": pair_dict})

def predictedsport(medal, discipline_title, event_title):
    """
    Function to predict the next country to win a medal in a specific sport.
    """
    discipline_encoded = le_discipline.transform([discipline_title])[0]
    event_encoded = le_event.transform([event_title])[0]
    medal_encoded = le_medal.transform([medal])[0]

    input_data = pd.DataFrame([[discipline_encoded, event_encoded, medal_encoded]], columns=['discipline_title_encoded', 'event_title_encoded', 'medal_encoded'])
    predicted_country_encoded = model.predict(input_data)[0]
    predicted_country = le_country.inverse_transform([predicted_country_encoded])[0]
    return predicted_country

def predictedcountry(medal_type):
    """
    Function to predict the next country to win the most medals.
    """
    current_country = medal_type.iloc[-1]['country_name']
    countries = medal_type['country_name'].unique()
    transition_matrix = pd.DataFrame(0, index=countries, columns=countries)

    for i in range(len(medal_type) - 1):
        current = medal_type.iloc[i]['country_name']
        next_country = medal_type.iloc[i + 1]['country_name']
        transition_matrix.loc[current, next_country] += 1

    transition_matrix = transition_matrix.div(transition_matrix.sum(axis=1), axis=0)
    predicted_country_2020 = predict_next_country(current_country, transition_matrix)
    return predicted_country_2020

def predict_next_country(current_country, transition_matrix):
    """
    Function to predict the next country based on the transition matrix.
    """
    if current_country in transition_matrix.index:
        next_country = transition_matrix.loc[current_country].idxmax()
        return next_country
    else:
        return "Unknown"
