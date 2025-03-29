# **Medicine Recommendation System**
# => Import Libraries
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC
import pandas as pd
import numpy as np
import warnings
import pickle
import os

warnings.filterwarnings('ignore')
pd.set_option('display.max_columns', None)

# => Load Data Set
df = pd.read_csv('./dataset/Training.csv')
sym_des = pd.read_csv('./dataset/symtoms_df.csv')
precautions = pd.read_csv('./dataset/precautions_df.csv')
workout = pd.read_csv('./dataset/workout_df.csv')
description = pd.read_csv('./dataset/description.csv')
medications = pd.read_csv('./dataset/medications.csv')
diets = pd.read_csv('./dataset/diets.csv')

# Check the Data
df.head()
df.shape
df['prognosis'].unique()

# => Split the Data into Train-Test Split
X = df.drop('prognosis', axis=1)
y = df['prognosis']

# Label Encoding for the target variable
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Ensure X is in proper NumPy format
X = X.astype(np.float64)

# Splitting the dataset correctly
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Ensure X_train and X_test are contiguous NumPy arrays
X_train = np.ascontiguousarray(X_train)
X_test = np.ascontiguousarray(X_test)

# => Train Multiple Models and Select the Best One
models = {
    'SVC': SVC(kernel='linear'),
    'Random Forest': RandomForestClassifier(random_state=42, n_estimators=100),
    'KNeighbors': KNeighborsClassifier(n_neighbors=5),
    'Gradient Boosting': GradientBoostingClassifier(random_state=42, n_estimators=100),
    'MultinomialNB': MultinomialNB()
}

best_model = None
best_accuracy = 0

for model_name, model in models.items():
    try:
        # Train model
        model.fit(X_train, y_train)
        
        # Test model
        predictions = model.predict(X_test)
        
        # Calculate accuracy
        accuracy = accuracy_score(y_test, predictions)
        print(f"{model_name} Accuracy: {accuracy:.4f}")
        
        # Select the best model dynamically
        if accuracy > best_accuracy:
            best_accuracy = accuracy
            best_model = model
    except Exception as e:
        print(f"Error training {model_name}: {e}")

# Ensure we are using the best model
print(f"\nBest Model Selected: {type(best_model).__name__} with accuracy {best_accuracy:.4f}")

# => Save the Best Model
path = './best_model.pkl'
os.makedirs(os.path.dirname(path), exist_ok=True)

with open(path, 'wb') as file:
    pickle.dump(best_model, file)

# Load the model for testing
loaded_model = pickle.load(open(path, 'rb'))

# Single test case to verify model correctness
sample_input = X_test[0].reshape(1, -1)
print('Model Predictions:', loaded_model.predict(sample_input))
print('Actual Labels:', y_test[0])

# => Disease Recommendation System
def helper(dis):
    """Fetches details about the disease, including description, precautions, medication, diet, and workout."""
    desc = description[description['Disease'] == dis]['Description'].values
    desc = desc[0] if len(desc) > 0 else "No description available"

    pre = precautions[precautions['Disease'] == dis][['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']].values
    pre = pre[0].tolist() if len(pre) > 0 else []

    med = medications[medications['Disease'] == dis]['Medication'].values
    med = med.tolist() if len(med) > 0 else []

    die = diets[diets['Disease'] == dis]['Diet'].values
    die = die.tolist() if len(die) > 0 else []

    wrkout = workout[workout['disease'] == dis]['workout'].values
    wrkout = wrkout.tolist() if len(wrkout) > 0 else []

    return desc, pre, med, die, wrkout

# => Model Prediction
def given_predicted_value(patient_symptoms):
    """Predicts disease based on given symptoms."""
    input_vector = np.zeros(len(X.columns))
    for symptom in patient_symptoms:
        if symptom in X.columns:
            input_vector[X.columns.get_loc(symptom)] = 1
        else:
            print(f"Warning: {symptom} not found in training data.")
    prediction_index = loaded_model.predict([input_vector])[0]
    return le.inverse_transform([prediction_index])[0]

# User input handling
symptoms = input("Enter your symptoms (comma-separated): ")
user_symptoms = [s.strip() for s in symptoms.split(',')]

# Get predicted disease
predicted_disease = given_predicted_value(user_symptoms)

# Get disease-related information
desc, pre, med, die, wrkout = helper(predicted_disease)

# Display results
print("\n================= Predicted Disease =================")
print(predicted_disease)
print("\n================= Description =================")
print(desc)
print("\n================= Precautions =================")
for i, p in enumerate(pre, 1):
    print(f"{i}: {p}")

print("\n================= Medications =================")
for i, m in enumerate(med, 1):
    print(f"{i}: {m}")

print("\n================= Workout =================")
for i, w in enumerate(wrkout, 1):
    print(f"{i}: {w}")

print("\n================= Diets =================")
for i, d in enumerate(die, 1):
    print(f"{i}: {d}")
