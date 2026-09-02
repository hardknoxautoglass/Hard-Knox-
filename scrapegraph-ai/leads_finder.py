"""
Leads finder for Hard Knox Auto Glass.

Searches the web for businesses/organizations that are good referral or
partnership leads for an auto glass repair/replacement shop (e.g. body
shops, used car dealers, insurance agents, fleet/rental companies) and
extracts structured contact info using an LLM-driven scraping graph.

Usage:
    cp .env.example .env      # fill in OPENAI_API_KEY
    source .venv/bin/activate
    python leads_finder.py "auto body shops in Knoxville TN"
"""

import sys
from typing import List, Optional

from dotenv import load_dotenv
from pydantic import BaseModel, Field

from scrapegraphai.graphs import SearchGraph
from scrapegraphai.utils import export_to_csv, export_to_json, prettify_exec_info

load_dotenv()


class Lead(BaseModel):
    business_name: str = Field(description="Name of the business or organization")
    category: str = Field(
        description="Type of business, e.g. body shop, dealership, insurance agency"
    )
    address: Optional[str] = Field(default=None, description="Street address if available")
    phone: Optional[str] = Field(default=None, description="Phone number if available")
    website: Optional[str] = Field(default=None, description="Website URL if available")
    notes: Optional[str] = Field(
        default=None, description="Why this business is a good referral/partner lead"
    )


class Leads(BaseModel):
    leads: List[Lead]


def find_leads(query: str, max_results: int = 5, model: str = "openai/gpt-4o-mini"):
    graph_config = {
        "llm": {"model": model},
        "max_results": max_results,
        "verbose": True,
    }

    prompt = (
        f"Find businesses matching: {query}. For each one, extract the "
        "business name, category, address, phone number, and website, "
        "and note why they would be a good referral or partnership lead "
        "for an auto glass repair and replacement company."
    )

    search_graph = SearchGraph(prompt=prompt, config=graph_config, schema=Leads)
    result = search_graph.run()

    print(prettify_exec_info(search_graph.get_execution_info()))
    return result


if __name__ == "__main__":
    query = " ".join(sys.argv[1:]) or "auto body shops and car dealerships near Knoxville TN"
    leads = find_leads(query)
    print(leads)

    lead_dicts = leads["leads"] if isinstance(leads, dict) else leads.model_dump()["leads"]
    export_to_json(lead_dicts, "leads.json")
    export_to_csv(lead_dicts, "leads.csv")
