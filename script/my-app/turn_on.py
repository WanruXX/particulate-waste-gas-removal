import os
import time
import random
from dotenv import load_dotenv
from convex import ConvexClient

load_dotenv(".env.local")
load_dotenv()

client = ConvexClient(os.getenv("CONVEX_URL"))

normal_range = [
    [8, 0, 370, 376, 0.4, 1],
    [0, 1, 284, 287, 1.8, 2.2],
    [1, 2, 284, 287, 1.6, 2.2],
    [2, 3, 284, 287, 1, 2.2],
    [3, 4, 284, 287, 1.6, 2.2],
    [4, 9, 284, 298, 1.0, 1.2],
    [2, 5, 284, 287, 1.8, 2.2],
    [4, 5, 284, 287, 1.6, 2.2],
    [5, 6, 284, 298, 1.0, 1.2],
    [7, 1, 243, 246, 1.0, 1.2],
    [6, 10, 294, 298, 1.0, 1.2],
    [7, 11, 243, 246, 1.0, 1.2],
    [12, 1, 284, 287, 1.6, 2.2]
]

def get_random_t(min_t, max_t):
    return random.randrange(min_t * 100, max_t * 100) / 100
    
def get_random_p(min_p, max_p):
    return random.randrange(min_p * 10000, max_p * 10000) / 10000
    

client.mutation("tasks:updateReactorState", dict(sensorId=0, newState=2))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=7, newState=2))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=2, newState=2))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=3, newState=2))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=6, newState=2))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=5, newState=2))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=4, newState=2))
time.sleep(random.randrange(1,20)/10)
client.mutation("tasks:updateReactorState", dict(sensorId=1, newState=2))
time.sleep(random.randrange(1,20)/10)

startTime = time.time()

while time.time() - startTime < 5000:
    for pipe in normal_range:
        time.sleep(0.1)
        client.mutation("tasks:updateTandP", dict(input=pipe[0], output=pipe[1], newT=get_random_t(pipe[2], pipe[3]), newP=get_random_p(pipe[4], pipe[5]), newRate=random.randrange(500,2000)/100))