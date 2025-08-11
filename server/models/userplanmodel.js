import {Schema,model} from 'mongoose';

const userplan = new Schema({
    
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  },
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active'
  }
});

const Userplan = model('Userplan', userplan);
export default Userplan;