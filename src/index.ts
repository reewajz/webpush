import App from './app';
import { connect } from './db';

const app = new App();

connect();
app.start();