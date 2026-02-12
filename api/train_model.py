import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle 
# Load the dataset
data = pd.read_csv("study_data.csv")
# Split input and output
X = data[["hours_studied","sleep_hours","phone_usage"]]
y = data["score"]

# Train model
model = LinearRegression()
model.fit(X, y)

# Save model
pickle.dump(model, open("model.pkl", "wb"))

print("Model trained and saved!")