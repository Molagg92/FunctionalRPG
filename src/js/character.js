// This is a function factory. 
// We can easily create more specific functions that 
// alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}
// --------------------------------------------------------------------------------------------

// Template for characters
const storeState = (initialStats) => {
  let currentState = initialStats; // currentState is where the initial properties are stored. Later, currentState is also updated.
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

// Character initial stats
const warriorInitialStats = {
  hitPoints: 200,
  manaPoints: 100,
}

// Character instances
const JojoTheBarbarian = storeState(warriorInitialStats);


// --------------------------------------------------------------------------------------------
// Gives name to character; Updates the state to reflect it
const giveName = (newName) => {
  return (state) => {
    return {...state, name: newName };
  };
};

const meleeAttack = () => {
  return (state) => {
    return {...state, attack: () => `You attack.`}
  }
}

// const meleeAttack = function(playerCharacter) {
//   const obj = {
//     ...playerCharacter,
//     attack: function () {
//       return `The ${playerCharacter.name} attacks.`
//     }
//   }
//   return obj;
// }


const castFireball = function(playerCharacter) {
  const obj = {
    ...playerCharacter,
    sleep: function() {
      return `The ${playerCharacter} hurls a ball of flames at ${}.`
    }
  }
  return obj;
}


const sleepingEatingCreature = function(playerCharacter) {
  let currentState = {
    playerCharacter
  }
  
  return { ...currentState, ...meleeAttack(currentState), ...castFireball(currentState) };
}

// --------------------------------------------------------------------------------------
JojoTheBarbarian(giveName("Jojo"));
JojoTheBarbarian(meleeAttack());
console.log(JojoTheBarbarian);