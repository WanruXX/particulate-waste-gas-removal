import os
import time
import random
from dotenv import load_dotenv
from convex import ConvexClient

load_dotenv(".env.local")
load_dotenv()

client = ConvexClient(os.getenv("CONVEX_URL"))

    
client.mutation("tasks:updateReactorStatus", dict(sensorId=2, newStatusCode=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorStatus", dict(sensorId=4, newStatusCode=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorStatus", dict(sensorId=5, newStatusCode=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorStatus", dict(sensorId=0, newStatusCode=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorStatus", dict(sensorId=6, newStatusCode=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorStatus", dict(sensorId=7, newStatusCode=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorStatus", dict(sensorId=1, newStatusCode=0))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorStatus", dict(sensorId=3, newStatusCode=0))
time.sleep(random.randrange(1,20)/10)