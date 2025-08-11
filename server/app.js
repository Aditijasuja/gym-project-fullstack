import app from './index.js';
import connectionToDb from './config/dbconnection.js';


app.listen(PORT, async () =>
    {
        await connectionToDb();
        console.log('Listening on port',PORT);
    })
    
 