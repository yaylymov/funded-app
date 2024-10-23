from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import csv
from fastapi.middleware.cors import CORSMiddleware
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

file_path = 'data/funded_database.csv'


class Questionnaire(BaseModel):
    state: str
    company_size: str
    areas: str
    grants_amount: int
    revenue: int


# English-to-German mapping
company_size_mapping = {
    "Small": ["Kleinstunternehmen", "Kleines Unternehmen"],
    "Medium": ["Mittleres Unternehmen"],
    "Large": ["Großes Unternehmen"]
}


def map_company_size_to_german(input_size: str):
    if input_size in company_size_mapping:
        return company_size_mapping[input_size]
    return [input_size]


def filter_grants(answers):
    """
    This function loads all grants from the CSV file.
    """
    filtered_grants = []

    german_company_sizes = map_company_size_to_german(answers.company_size)

    with open(file_path, newline='', encoding='utf-8') as database:
        reader = csv.reader(database)
        header = next(reader)

        for row in reader:
            if any(cell is None for cell in row):
                print(f"The row='{row}' is skipped")
                # Skip rows with missing data
                continue

            funding_option, state, grant_volume, funding_quota, approval_rate, company_size, areas, revenue_max, time_required, benefit_cost_score = row

            # For debugging reasons
            print(
                f"Comparing: state='{answers.state}' with '{state}', companySize='{answers.company_size}' with '{company_size}', areas='{answers.areas}' with '{areas}'")

            # Convert to lower case
            state_match = answers.state.lower() in state.lower()
            company_size_match = any(size.lower() in company_size.lower() for size in german_company_sizes)
            areas_match = answers.areas.lower() in areas.lower()

            # Filter logic based on the answers
            if state_match and company_size_match and areas_match:
                filtered_grants.append({
                    "funding_option": funding_option,
                    "state": state,
                    "grant_volume": grant_volume,
                    "funding_quota": funding_quota,
                    "approval_rate": approval_rate,
                    "company_size": company_size,
                    "areas": areas,
                    "revenue_max": revenue_max,
                    "time_required": time_required,
                    "benefit_cost_score": benefit_cost_score
                })

    return filtered_grants


def load_all_grants():
    filtered_grants = []

    with open(file_path, newline='', encoding='utf-8') as database:
        reader = csv.reader(database)
        header = next(reader)

        for row in reader:
            if any(cell is None for cell in row):
                print(f"The row='{row}' is skipped")
                continue

            funding_option, state, grant_volume, funding_quota, approval_rate, company_size, areas, revenue_max, time_required, benefit_cost_score = row

            filtered_grants.append({
                "funding_option": funding_option,
                "state": state,
                "grant_volume": grant_volume,
                "funding_quota": funding_quota,
                "approval_rate": approval_rate,
                "company_size": company_size,
                "areas": areas,
                "revenue_max": revenue_max,
                "time_required": time_required,
                "benefit_cost_score": benefit_cost_score
            })
    return filtered_grants


@app.get("/grants")
async def get_all_grants():
    try:
        grants = load_all_grants()
        return grants
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while getting all grants: {str(e)}")


@app.post("/questions")
async def process_questionnaire(data: Questionnaire):
    logger.info(f"Received data: {data}")
    try:
        filtered_grants = filter_grants(data)
        logger.info(f"Filtered grants: {filtered_grants}")
        return filtered_grants
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while sending data to questions: {str(e)}")


@app.get("/")
async def root():
    return {"message": "FUNDED backend is up and running!"}
