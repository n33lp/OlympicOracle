import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Declare global variables to store data and models
df_medals = None
df_results = None
most_gold_medals = None
most_silver_medals = None
most_bronze_medals = None
pair_dict = None
le_discipline = None
le_event = None
le_country = None
le_medal = None
model = None

def load_and_prepare_data():
    global df_medals, df_results, most_gold_medals, most_silver_medals, most_bronze_medals, pair_dict
    global le_discipline, le_event, le_country, le_medal, model

    # Load the Olympic medals data
    df_medals = pd.read_csv('data/olympic_medals.csv')
    df_medals['slug_game'] = df_medals['slug_game'].str[-4:]
    df_medals = df_medals.rename(columns={'slug_game': 'year'})
    df_medals['year'] = df_medals['year'].astype(int)
    summer_years = range(1896, 2020, 4)
    df_medals = df_medals[df_medals['year'].isin(summer_years)]
    df_medals = df_medals[df_medals['year'] != 2020]
    df_medals['country_name'] = df_medals['country_name'].replace("People's Republic of China", 'China')

    # Clean medal data and aggregate counts
    clean_most_medals()

    # Load the results data
    df_results = pd.read_csv('data/df_results_final.csv')
    unique_pairs = df_results[['discipline_title', 'event_title']].drop_duplicates()
    unique_disciplines = unique_pairs['discipline_title'].unique().tolist()
    pair_dict = {discipline: unique_pairs[unique_pairs['discipline_title'] == discipline]['event_title'].tolist() for discipline in unique_disciplines}

    # Prepare data for modeling
    df_results.drop_duplicates(inplace=True)
    df_results.fillna({'medal_type': 'None'}, inplace=True)
    df_results = df_results[df_results['medal_type'] != 'None']

    # Initialize label encoders
    le_medal = LabelEncoder()
    le_discipline = LabelEncoder()
    le_event = LabelEncoder()
    le_country = LabelEncoder()

    # Fit the label encoders
    le_medal.fit(df_results['medal_type'].dropna())
    le_discipline.fit(df_results['discipline_title'])
    le_event.fit(df_results['event_title'])
    le_country.fit(df_results['country_name'])

    # Transform data using encoders
    df_results['medal_encoded'] = le_medal.transform(df_results['medal_type'])
    df_results['discipline_title_encoded'] = le_discipline.transform(df_results['discipline_title'])
    df_results['event_title_encoded'] = le_event.transform(df_results['event_title'])
    df_results['country_name_encoded'] = le_country.transform(df_results['country_name'])

    # Prepare features and target for the model
    X = df_results[['discipline_title_encoded', 'event_title_encoded', 'medal_encoded']]
    y = df_results['country_name_encoded']

    # Split the data and train the model
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

def clean_most_medals():
    global df_medals, most_gold_medals, most_silver_medals, most_bronze_medals
    # Gold medals
    df_gold_medals = df_medals[df_medals['medal_type'] == 'GOLD']
    gold_medal_counts = df_gold_medals.groupby(['year', 'country_name']).size().reset_index(name='gold_count')
    most_gold_medals = gold_medal_counts.loc[gold_medal_counts.groupby('year')['gold_count'].idxmax()]

    # Silver medals
    df_silver_medals = df_medals[df_medals['medal_type'] == 'SILVER']
    silver_medal_counts = df_silver_medals.groupby(['year', 'country_name']).size().reset_index(name='silver_count')
    most_silver_medals = silver_medal_counts.loc[silver_medal_counts.groupby('year')['silver_count'].idxmax()]

    # Bronze medals
    df_bronze_medals = df_medals[df_medals['medal_type'] == 'BRONZE']
    bronze_medal_counts = df_bronze_medals.groupby(['year', 'country_name']).size().reset_index(name='bronze_count')
    most_bronze_medals = bronze_medal_counts.loc[bronze_medal_counts.groupby('year')['bronze_count'].idxmax()]

def startup():
    load_and_prepare_data()
    print("Data loaded and model trained on startup.")
