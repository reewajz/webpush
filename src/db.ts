import mongoose from 'mongoose';

export async function connect() {
    const host = "mongodb://localhost:27017/webpush";
    const options =  {
        useNewUrlParser: true,
    };
    try {
        await mongoose.connect(host,options);
        console.log('>>> Database connected');
    }
    catch {
        console.log('Error');
    }
}
