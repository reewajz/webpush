import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

const router = Router();
const token = " fPWwTnFWeeA:APA91bF-hZCtadsk-s8EywBHdaUncJpdj4-N6lDyu4FTNXwYxPjrxLBzokl7Mh0hMLm8IMorCPaYcl9qBlI3vweE66NP9YAsOTNeUnw4V-G2AeVUoVva5KFeE7ZkVSlDDmXsGxMSRdSu";
router.get('/', (req: Request, res: Response) => {
    fetch('https://fcm.googleapis.com/fcm/send',{
        method: 'post',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'key=AAAAONv9ZI0:APA91bHfQL86QrKrmqPJ6XdgJQIBTUS5aPud5k4yIThCeazo-K8ZnSI9hnX64o1HXN1TqxW9TOXL0b2WMmxTMy6PN2rHTwi_tBBsWgFvV_XCxFMYc4tJQPag8PuL79w1KrzwmH1Kb_vG'
        },
        body: JSON.stringify({
            "data":{
                    "notification": {
                    "title": "RED ALERT",
                    "body": "Hello From the other side!"
                }
            },
            "to": token
            })            
    })
    .then(res => res.json())
    .then(json=>{
        console.log(json);
        res.status(200).json({sucess:true})
    })
});

export default router;