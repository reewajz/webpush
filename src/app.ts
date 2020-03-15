import express from 'express';
import path from 'path';

import indexRouter from './routes/index';
import subscriptionRouter from './routes/subscription';

export default class Application {
    public app: express.Application;

    constructor (){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings () {
        this.app.set('port',5000);
        this.app.set('views',path.join(__dirname,'views'));
    }

    middlewares() {
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use('/',indexRouter);
        this.app.use('/subscription',subscriptionRouter);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('>>> Server is running at', this.app.get('port'));
        });
    }

}