from fastapi import FastAPI

# 1. Crear la instancia de la aplicación
app = FastAPI()

# 2. Definir una ruta 
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
