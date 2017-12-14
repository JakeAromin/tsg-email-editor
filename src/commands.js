define(function() {
  return (opt = {}) => {
    let editor = opt.editor;
    let cmdm = editor.Commands;
    let importCommand = require('./openImportCommand');
    let exportCommand = require('./openExportCommand');
    let tglImagesCommand = require('./toggleImagesCommand');

    let addMtCommand = require('./commands/AddMergeTagCommand');
    let addCiCommand = require('./commands/AddCollectionIterationCommand');

    cmdm.add(opt.cmdOpenImport, importCommand(opt));
    cmdm.add(opt.cmdTglImages, tglImagesCommand(opt));

    // Overwrite export template after the editor is loaded
    // (default commands are loaded after plugins)
    editor.on('load', () => {
      cmdm.add('export-template', exportCommand(opt));
      
      // todo: Add commands for buttons of 'add new merge tags' and 'add new iteration'
      cmdm.add('c_add_merge_tag', addMtCommand(opt));
      cmdm.add('c_add_collection_iteration', addCiCommand(opt));
      // todo: Add commands for buttons of 'add new merge tags' and 'add new iteration'
    });

    cmdm.add('undo', {
      run(editor, sender) {
        sender.set('active', 0);
        editor.UndoManager.undo(1);
      }
    });
    cmdm.add('redo', {
      run(editor, sender) {
        sender.set('active', 0);
        editor.UndoManager.redo(1);
      }
    });
    cmdm.add('set-device-desktop', {
      run(editor) {
        editor.setDevice('Desktop');
      }
    });
    cmdm.add('set-device-tablet', {
      run(editor) {
        editor.setDevice('Tablet');
      }
    });
    cmdm.add('set-device-mobile', {
      run(editor) {
        editor.setDevice('Mobile portrait');
      }
    });
  };
})
