# OlympicOracle

OlympicAnalysis is a machine learning project that predicts the country that will win a specified medal (gold, silver, bronze) in a given Olympic discipline and event based on historical data.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Model](#model)
- [Limitations of Predicting Olympic Outcomes](#limitations-of-predicting-olympic-outcomes)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project uses historical Olympic data to train a machine learning model capable of predicting the country that is most likely to win a specific medal in a given discipline and event. The model is served using a FastAPI web server.

## Installation

1. **Clone the repository:**
   ```
   bash
   git clone https://github.com/yourusername/OlympicAnalysis.git
   cd OlympicAnalysis
   ```

2. **Create a virtual environment:**
    ```
    python3 -m venv env
    source env/bin/activate
   ```

3. **Install dependencies:**
    ```
    pip install -r requirements.txt
    ```

## Usage
1.  **Run the FastAPI server by going into the folder:**
    ```
    python3 backend.py
    ```

2. **Run the React server by going into the folder:**
    ```
    npm install
    npm start
    ```

## API

### Predict Medal Winner

### **Endpoint:**
GET '/'

- **Description:**
Check if the server is running

- **Request Body:**
```n/a```

- **Response:**
```json
{
  "message": "Hello world!"
}
```

### **Endpoint:**
POST '/bycountry'
- **Description:**
Predicts the country that will win a specified medal in a given Olympic discipline and event.

- **Request Body:**
```json
{
  "medalType": "gold",
}
```
- **Response:**
```json
{
  "message": "United States"
}
```

### **Endpoint:**
POST '/bysport'
- **Description:**
Predicts the country that will win a specified medal in a given Olympic discipline and event.

- **Request Body:**
```n/a```
- **Response:**
```json
{
  "message": "United States"
}
```

### **Endpoint:**
GET '/getsports/all'
- **Description:**
Gets all the diciplines and events.

- **Request Body:**
```json
{
  "medalType": "gold",
  "sport": "Swimming",
  "subsport": "Men's 100m Freestyle"
}
```
- **Response:**
```json
{
    "disciplines": {
        "Archery": [
            "Women's Individual",
            "Men's Individual",
            "Women's Team",
            ... ],
            ...
    }
}
```





## Model
The project uses a Random Forest classifier to predict the country that will win a specific medal based on the discipline and event titles. The model is trained on historical Olympic data and is updated periodically.

## Training the Model
The model is trained using the following features:

- discipline_title
- event_title
- medal_type

The target variable is:

- country_name

The data is gotten of kaggle (https://www.kaggle.com/datasets/piterfm/olympic-games-medals-19862018)


## Limitations of Predicting Olympic Outcomes

Predicting the outcomes of Olympic events based solely on historical data has several inherent limitations. While historical data can provide valuable insights and trends, it often fails to capture the full complexity and dynamic nature of sports competitions. Here are some key reasons why relying solely on past data for predictions may not be accurate:

1. **Changes in Athlete Performance**:
   - Athletes' performance levels can fluctuate significantly due to various factors such as injuries, changes in training regimes, and psychological states. Past data may not accurately reflect the current form and fitness of the competitors.

2. **Emergence of New Talent**:
   - Every Olympic cycle introduces new athletes who may not have previous records in the dataset. These newcomers can dramatically influence the competition outcomes, making predictions based solely on historical data incomplete.

3. **Retirement and Absence of Key Competitors**:
   - Top athletes from previous Olympics may retire or not participate in the current games due to injuries, personal reasons, or other factors. The absence of these key players can significantly alter the competitive landscape.

4. **Advancements in Training and Technology**:
   - Sports science and technology continuously evolve, leading to improved training methods, equipment, and strategies. These advancements can enhance athletes' performances in ways not captured by historical data.

5. **Changes in Event Formats and Rules**:
   - Modifications to event formats, rules, and qualification criteria can impact competition outcomes. Historical data may not account for these changes, leading to less accurate predictions.

6. **Weather and Environmental Conditions**:
   - External factors such as weather, altitude, and venue conditions can influence athletic performance. These variables are often unpredictable and not reflected in historical datasets.

### Importance of Current Player Statistics

To improve the accuracy of predicting Olympic outcomes, it is crucial to incorporate current player statistics and real-time data. This includes:

- **Recent Performance Metrics**:
  - Analyzing athletes' recent performances, including their latest competition results, personal bests, and seasonal trends.

- **Health and Fitness Assessments**:
  - Considering the current health status, injury reports, and fitness levels of the athletes.

- **Training Progress and Regimes**:
  - Monitoring athletes' training progress, intensity, and any changes in coaching strategies.

- **Psychological Readiness**:
  - Evaluating athletes' mental preparedness, confidence levels, and resilience under pressure.

- **Competitive Landscape**:
  - Understanding the current competitive field, including the presence of emerging talents and the retirement or absence of previous champions.

We ourselved tested this by have run a little experinment. What we did only used data till 2016 to predict the results for 2020, however they were not accurate. This can be found in the 1896-2022 folder.

In summary, while historical data provides a foundational understanding of trends and patterns, incorporating current player statistics and real-time information is essential for more accurate and reliable predictions of Olympic outcomes. This holistic approach ensures a better representation of the dynamic and ever-evolving nature of sports competitions.



## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
