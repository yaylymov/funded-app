from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openpyxl import load_workbook

app = FastAPI()

# Load the Excel file
file_path = 'data/funded-database.xlsx'
wb = load_workbook(file_path)
ws = wb.active


# Data model for Questionnaire
class Questionnaire(BaseModel):
    state: str
    company_size: str
    areas_active: str
    grants_amount: int
    revenue: int


def filter_grants(answers):
    """
    This function filters grants from the Excel sheet based on the given answers.
    """
    filtered_grants = []

    # Iterate over the rows of the Excel file
    for row in ws.iter_rows(min_row=2, values_only=True):
        # Assuming columns: ['Grant Option', 'State', 'Company Size', 'Area', 'Grant Volume', 'Funding Quota', 'Approval Rate', 'Benefit-Cost Score']
        grant_option, state, company_size, area, grant_volume, funding_quota, approval_rate, benefit_cost_score = row

        # Filter logic based on the answers provided
        if (answers.state.lower() in state.lower()) and (answers.company_size.lower() in company_size.lower()) and (
                answers.areas_active.lower() in area.lower()):
            filtered_grants.append({
                "funding_option": grant_option,
                "grant_volume": grant_volume,
                "funding_quota": funding_quota,
                "approval_rate": approval_rate,
                "benefit_cost_score": benefit_cost_score
            })

    return filtered_grants


@app.post("/questions")
async def process_questionnaire(data: Questionnaire):
    try:
        filtered_grants = filter_grants(data)
        if not filtered_grants:
            raise HTTPException(status_code=404, detail="No grants found based on your criteria")
        return filtered_grants
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


# Test route to ensure the backend is up and running
@app.get("/")
async def root():
    return {"message": "FUNDED backend is up and running!"}
