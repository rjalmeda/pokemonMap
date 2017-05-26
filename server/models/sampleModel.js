var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    currentPokemonIdx: Number,
    pokemons: Array,
    inventory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    trainerXP: {
        type: Number,
        default: 0
    },
    trainerLVL: {
        type: Number,
        default: 0
    },
    gold: {
        type: Number,
        default: 0
    },
    eggs: [{
        type: Number,
        default: 0
    }],
    gender: {
        "type": String,
        default: 'Male'
    }
});
mongoose.model('User', UserSchema);