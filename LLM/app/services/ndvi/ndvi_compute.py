import ee

def mask_s2_clouds(image):
    qa = image.select("QA60")
    cloud = 1 << 10
    cirrus = 1 << 11
    mask = qa.bitwiseAnd(cloud).eq(0).And(
        qa.bitwiseAnd(cirrus).eq(0)
    )
    return image.updateMask(mask).divide(10000)

def add_ndvi(image):
    return image.addBands(
        image.normalizedDifference(["B8", "B4"]).rename("NDVI")
    )
