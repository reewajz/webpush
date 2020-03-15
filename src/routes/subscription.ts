import { Router, Request, Response } from 'express';
import path from 'path';
import fingerprint from '../models/fingerprint'

const router = Router();

router.post('/', (req: Request, res: Response) => {
   var subscription = Object.assign(req.body,{details:JSON.parse(req.body.details)});
   fingerprint.create(subscription).then(result=>{
      if(result){
         res.status(200)
      }else{
         res.status(400)
      }
   })
});

export default router;