const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const JWT = require('jsonwebtoken');

//Create the Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  method: {
    type: String,
    enum: ["local", "google", "facebook", "twitter"],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    },
    confirmation: {
      status: {
        type: Boolean,
        required: false
      },
      code: {
        type: String,
        required: false
      }
    },
    resetPassword: {
      code: {
        type: String,
        required: false
      },
      expires: {
        type: Date,
        required: false
      }
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  twitter: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  tokens: [
  ],
  createdAt: {
    type: Date,
    required: false
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (this.method !== "local") {
      if(!this.createdAt) 
        this.createdAt = new Date().toISOString();
      next();
    }
    //Generate confirmation token
    const shasum = crypto.createHash('sha1');
    if(!this.local.confirmation.status) {
        shasum.update(this.local.email + Date.now());
        this.local.confirmation.code = shasum.digest('hex');
        this.local.confirmation.status = false;
    }
    if(!this.createdAt) {
      this.createdAt = new Date().toISOString();
    }
    if(!this.isModified('local.password')){
      next();
    }
    //Generate a salt
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(this.local.password, salt);
    this.local.password = passwordHashed;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateReset = function(done) {
  const user = this;
  crypto.randomBytes(20, function(error, buf){
    if(error)
      return done(error);
    const token = buf.toString('hex');
    const expires = Date.now() + 3600000; //1 hour
    user.set('local.resetPassword.code', token);
    user.set('local.resetPassword.expires', expires);
    user.save(done);
  });
}

userSchema.methods.generateAuthToken = function () {
  let token = JWT.sign({
    iss: 'MindMoneyBusiness',
    sub: this.id,
    iat: new Date().getTime(),
  }, process.env.JWTSECRET).toString();
  this.tokens.push(token);
  return this.save().then(() => {
    return token
  });
};

userSchema.methods.removeToken = function () {
  
};

userSchema.methods.isValidPassword = async function(password) {
    try {
      return await bcrypt.compare(password, this.local.password);
    } catch(error) {
      throw new error(error);
    }
};

//Create a model
const User = mongoose.model("user", userSchema);

module.exports = User;
