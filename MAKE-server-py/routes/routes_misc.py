import logging
from utilities import validate_api_key
from db_schema import *
from machines.loom import render_loom_file

from fastapi import APIRouter, HTTPException, Request

misc_router = APIRouter(
    prefix="/api/v2/misc",
    tags=["misc"],
    responses={404: {"description": "Not found"}},
)


@misc_router.get("/status")
async def route_get_status():
    # Get the status
    logging.getLogger().setLevel(logging.INFO)
    logging.info("Getting status...")
    return {"status": "ok"}


@misc_router.post("/render_loom_file")
async def route_render_loom_file(request: Request):
    # Get the request body
    body = await request.json()
    
    # Render a loom file
    logging.getLogger().setLevel(logging.INFO)
    logging.info("Rendering loom file...")

    try :
        result = render_loom_file(body["file"], body["extension"], body["output_format"], body["loom_width"], body["desired_width"], body["invert"], body["tabby_width"])
    except Exception as e:
        # The loom file could not be rendered
        # Return error
        print(e)
        raise HTTPException(status_code=500, detail="An error occurred while rendering the loom file")
    
    if result is None:
        # The loom file could not be rendered
        # Return error
        raise HTTPException(status_code=400, detail="Loom file could not be rendered with the given parameters")
    
    # Return the rendered loom file
    return result