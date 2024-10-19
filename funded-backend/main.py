from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openpyxl import load_workbook
from fastapi.middleware.cors import CORSMiddleware
import logging
from typing import List

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the Excel file
file_path = 'data/funded-database.xlsx'
wb = load_workbook(file_path)
ws = wb.active


# Data model for Questionnaire
class Questionnaire(BaseModel):
    state: str
    companySize: str
    areas: str
    grantsAmount: int
    revenue: int


def filter_grants(answers: Questionnaire) -> List[dict]:
    """
    This function filters grants from the Excel sheet based on the given answers.
    """
    filtered_grants = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        funding_option, state, grant_volume, funding_quota, approval_rate, company_size, areas = row[:7]

        # Convert state and areas to lists if they're strings
        state_list = eval(state) if isinstance(state, str) else state
        areas_list = eval(areas) if isinstance(areas, str) else areas

        logger.info(f"Comparing: state='{answers.state}' with '{state_list}', "
                    f"companySize='{answers.companySize}' with '{company_size}', "
                    f"areas='{answers.areas}' with '{areas_list}'")

        # Check if the answer state is in the list of states for the grant
        state_match = any(answers.state.lower() in s.lower() for s in state_list)

        # Check if the company size matches
        size_match = answers.companySize.lower() in company_size.lower()

        # Check if any of the areas match
        area_match = any(area.lower() in answers.areas.lower() for area in areas_list)

        # Check if the grant amount is within the user's requested amount
        grant_amount_match = grant_volume <= answers.grantsAmount

        if state_match and size_match and area_match and grant_amount_match:
            filtered_grants.append({
                "funding_option": funding_option,
                "grant_volume": grant_volume,
                "funding_quota": funding_quota,
                "approval_rate": approval_rate,
                "company_size": company_size,
                "areas": areas_list
            })

    logger.info(f"Found {len(filtered_grants)} matching grants")
    return filtered_grants


@app.post("/questions")
async def process_questionnaire(data: Questionnaire):
    logger.info(f"Received data: {data}")
    try:
        filtered_grants = filter_grants(data)
        logger.info(f"Filtered grants: {filtered_grants}")
        return filtered_grants
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.get("/")
async def root():
    return {"message": "FUNDED backend is up and running!"}
