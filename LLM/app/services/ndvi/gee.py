import ee

def init_gee():
    try:
        ee.Initialize()
        print("GEE initialized")
    except Exception:
        ee.Authenticate()
        ee.Initialize()
