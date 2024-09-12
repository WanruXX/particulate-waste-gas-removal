import os
import time
import random
from dotenv import load_dotenv
from convex import ConvexClient

load_dotenv(".env.local")
load_dotenv()

client = ConvexClient(os.getenv("CONVEX_URL"))

    
client.mutation("tasks:updateReactorState", dict(sensorId=2, newState=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=4, newState=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=5, newState=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=0, newState=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=6, newState=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=7, newState=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=1, newState=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=3, newState=0))
time.sleep(random.randrange(1,20)/10)