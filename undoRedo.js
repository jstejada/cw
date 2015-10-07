
/*
 * Keep stacks of operations and their inverse. Apply over same object.
 */

function undoRedo(obj) {

  var undo = [];
  var redo = [];
  var ops  = [];

  var set = function(key, val) {
    obj[key] = val;
  }
  var del = function(key) {
    delete obj[key];
  }

  var revert = {
    set: function(key) {
      if(obj[key] != null) {
        // Set prev value if there existed one
        return set.bind(null, key, obj[key]);
      } else {
        // Delete value if it is new
        return del.bind(null, key);
      }
    },
    del: function(key) {
      // Revert del is always set the val again
      return set.bind(null, key, obj[key]);
    }
  }

  return {
    set: function(key, value, clearRedo) {
      // Clear the redo stack if user starts new op
      // e.g. after several undos, the redo stack will contain ops. Must clear
      // it if user does a new op after any number of undos
      clearRedo = typeof clearRedo !== 'undefined' ? clearRedo : true;
      if(clearRedo) { redo = []; }

      undo.push(revert.set(key));
      ops.push(this.set.bind(this, key, value, false)); // When adding ops to the stack never clear
      set(key, value);
    },
    get: function(key) {
      return obj[key];
    },
    del: function(key, clearRedo) {
      // Clear the redo stack if user starts new op
      // e.g. after several undos, the redo stack will contain ops. Must clear
      // it if user does a new op after any number of undos
      clearRedo = typeof clearRedo !== 'undefined' ? clearRedo : true;
      if(clearRedo) { redo = []; }

      undo.push(revert.del(key));
      ops.push(this.del.bind(this, key, false)); // When adding ops to the stack never clear
      del(key);
    },
    undo: function() {
      if(undo.length > 0) {
        redo.push(ops.pop()); // Add the op to the redo stack
        undo.pop()();
      } else {
        throw new Error("Nothing to undo");
      }
    },
    redo: function() {
      if(redo.length > 0) {
        redo.pop()();
      } else {
        throw new Error("Nothing to redo");
      }
    }
  };
}


module.exports = undoRedo;
