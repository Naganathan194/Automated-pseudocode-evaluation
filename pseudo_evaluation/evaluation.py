import os
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import google.generativeai as genai
from pprint import pprint

# Load environment variables
load_dotenv()

# Configure Google Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# MongoDB connection
MONGO_DETAILS = "mongodb://localhost:27017/"
client = MongoClient(MONGO_DETAILS)
database = client["sproc"]
collection = database["user_details"]

# Define the questions
QUESTIONS = {
    0: 'Write a pseudo code to print "Hello World"',
    1: 'Write a pseudo code to find the sum of two numbers',
    2: 'Write a pseudo code to check if a number is prime',
    3: 'Write a pseudo code to check if a number is odd'
}

def evaluate_pseudocode(pseudo_code, question_id):
    try:
        model = genai.GenerativeModel('gemini-pro')
        question = QUESTIONS.get(int(question_id), "Unknown question")
        prompt = f"""
        Evaluate the following pseudocode for the given question based on the logic don't look on syntax and stuffs like that and provide a score out of 10. DONT generate any descriptions or explainations or corrections, you are an invigilator correcting the answers, just do that
        Your response should be in the format:
        Score: [number]
        

        Question: {question}
        
        Pseudocode:
        {pseudo_code}
        """
        response = model.generate_content(prompt)
        
        print("Raw API Response:")
        print(response.text)
        
        score = extract_score(response.text)
        return score
    except Exception as e:
        print(f"An error occurred while evaluating pseudocode: {e}")
        return None

def extract_score(response_text):
    try:
        for line in response_text.split('\n'):
            if line.strip().lower().startswith('score:'):
                score_str = line.split(':')[1].strip()
                score_str=score_str.split('/')[0]
                score = float(score_str)
                if 0 <= score <= 10:
                    return round(score)
        print("Could not extract a valid score from the response.")
        return None
    except Exception as e:
        print(f"Error extracting score: {e}")
        return None

def get_all_user_details():
    try:
        user_details_cursor = collection.find({})
        user_details_list = list(user_details_cursor)
        if not user_details_list:
            print("No user details found in the database.")
            return []
        return user_details_list
    except Exception as e:
        print(f"An error occurred while fetching user details: {e}")
        return []

if __name__ == "__main__":
    user_data = get_all_user_details()
    if user_data:
        print(f"Found {len(user_data)} user records.")
        user_list = []

        for user in user_data:
            print(f"\nProcessing user: {user.get('Name', 'Unknown')}")

            scores = []
            
            pseudo_code_answers = user.get('pseudoCodeAnswers', {})
            if isinstance(pseudo_code_answers, dict):
                pseudo_code_answers = pseudo_code_answers.get('pseudoCodeAnswers', {})

            if not isinstance(pseudo_code_answers, dict):
                print(f"Invalid pseudoCodeAnswers format for user {user.get('Name', 'Unknown')}. Skipping.")
                continue

            for question_id, pseudo_code in pseudo_code_answers.items():
                print(f"\nEvaluating pseudo code for question {question_id}")
                score = evaluate_pseudocode(pseudo_code, question_id)
                if score is not None:
                    print(f"Score: {score}")
                    scores.append(score)

                else:
                    print("Failed to get a valid score for this pseudocode.")

            if scores:
                print(f"Final scores for {user.get('Name', 'Unknown')}: {scores}")

                # Update MongoDB with the scores
                update_result = collection.update_one(
                    {'_id': user['_id']},
                    {'$set': {'pseudoCodeScores': scores}}
                )
                print(f"MongoDB update result: {update_result.modified_count} document(s) modified")

                user_list.append({
                    "Name": user.get('Name', 'Unknown'),
                    "RegNo": user.get('RegNo', 'Unknown'),
                    "Email": user.get('email', 'Unknown'),
                    "PseudoCodeAnswers": pseudo_code_answers,
                    "Scores": scores,
                    "TOTAL SCORE":sum(scores)
                })
            else:
                print(f"No valid scores obtained for user {user.get('Name', 'Unknown')}.")

        if user_list:
            df = pd.DataFrame(user_list)
            print("\nFinal DataFrame:")
            print(df)

            try:
                df.to_excel("user_pseudocode_scores.xlsx", index=False)
                print("Scores have been evaluated and saved to user_pseudocode_scores.xlsx")
            except PermissionError as e:
                print(f"Permission error: {e}. Ensure the file is not open and you have write permissions.")
        else:
            print("No user data with valid scores to save.")
    else:
        print("No user details to process.")