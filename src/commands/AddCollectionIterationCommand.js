define(function () {
  return (opt = {}) => {
    /* var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; */

    let editor = opt.editor;
    let pfx = opt.pfx || ''; // gjs-

    /* Init the container */
    let container = document.createElement("div"); // <div></div>

    if (opt.modalLabelAddIteration) { // 'Input the collection iteration block'
      let labelEl = document.createElement('div');
      labelEl.className = pfx + 'new-ci';
      labelEl.innerHTML = opt.modalLabelAddIteration;
      container.appendChild(labelEl);
    }

    /* Init the labels and text-inputs */

    /* <span contenteditable="false"><div>
    {% for payment in paymentDetails %}
        <div>{{ payment.date }}</div>
        <div>{{ payment.ref }}</div>
        {% else %}
        <p> No payment details available against the account number. </p>
    {% endfor %}
    </div></span> */

    let label_modelName = document.createElement("label");
    let text_modelName = document.createTextNode("Model Name: ");
    label_modelName.appendChild(text_modelName);
    let tb_modelName = document.createElement("input");
    tb_modelName.setAttribute("type", "text");

    // todo: Loop the properties of the model
    let label_p1 = document.createElement("label");
    let text_p1 = document.createTextNode("Property <1>: ");
    label_p1.appendChild(text_p1);
    let tb_p1 = document.createElement("input");
    tb_p1.setAttribute("type", "text");

    let label_p2 = document.createElement("label");
    let text_p2 = document.createTextNode("Property <2>: ");
    label_p2.appendChild(text_p2);
    let tb_p2 = document.createElement("input");
    tb_p2.setAttribute("type", "text");

    /* Init add collection iteration button */
    let btnImp = document.createElement("button"); // <button class="gjs-btn-prim gjs-btn-import">Add the collection iteration</button>
    btnImp.innerHTML = opt.modalBtnAddCI; // 'Add the collection iteration'
    btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-new-ci';

    let br_1 = document.createElement("br");
    let br_2 = document.createElement("br");
    let br_3 = document.createElement("br");
    let br_4 = document.createElement("br");
    let br_5 = document.createElement("br");
    let br_6 = document.createElement("br");
    let br_7 = document.createElement("br");

    container.appendChild(label_modelName);
    container.appendChild(br_1);
    container.appendChild(tb_modelName);
    container.appendChild(br_2);
    container.appendChild(label_p1);
    container.appendChild(br_3);
    container.appendChild(tb_p1);
    container.appendChild(br_4);
    container.appendChild(label_p2);
    container.appendChild(br_5);
    container.appendChild(tb_p2);
    container.appendChild(br_6);
    container.appendChild(br_7);
    container.appendChild(btnImp);

    btnImp.onclick = () => {
      alert("Add collection iteration button pressed");
      // todo: Saving the collection iteration




      editor.Modal.close();
    };

    /* return when the button pressed */
    return {
      run(editor, sender) {
        console.log("logging the editor in return block");
        console.log(editor);
        console.log("logging the sender in return block");
        console.log(sender);

        let md = editor.Modal;

        md.setTitle(opt.modalTitleCI); // 'Add new collection iteration block'

        let modalContent = md.getContentEl(); // The container

        md.setContent('');
        md.setContent(container);
        md.open();
        sender && sender.set('active', 0);
      },
    }
  };
});
