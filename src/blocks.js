define(function() {
  return (opt = {}) => {
    let tableStyleStr = '';
    let cellStyleStr = '';
    let editor = opt.editor;
    let tableStyle = opt.tableStyle || {};
    let cellStyle = opt.cellStyle || {};
    let bm = editor.BlockManager;
    let rte = editor.RichTextEditor;
    for (let prop in tableStyle){
      tableStyleStr += `${prop}: ${tableStyle[prop]}; `;
    }
    for (let prop in cellStyle){
      cellStyleStr += `${prop}: ${cellStyle[prop]}; `;
    }
    bm.getAll().reset();
    bm.add('sect100', {
      label: opt.sect100BlkLabel,
      category: opt.categoryLabel,
      attributes: {class:'gjs-fonts gjs-f-b1'},
      content: `<table style="${tableStyleStr}">
        <tr>
          <td style="${cellStyleStr}"></td>
        </tr>
        </table>`,
    });
    bm.add('sect50', {
      label: opt.sect50BlkLabel,
      category: opt.categoryLabel,
      attributes: {class:'gjs-fonts gjs-f-b2'},
      content: `<table style="${tableStyleStr}">
        <tr>
          <td style="${cellStyleStr} width: 50%"></td>
          <td style="${cellStyleStr} width: 50%"></td>
        </tr>
        </table>`,
    });
    bm.add('sect30', {
      label: opt.sect30BlkLabel,
      category: opt.categoryLabel,
      attributes: {class:'gjs-fonts gjs-f-b3'},
      content: `<table style="${tableStyleStr}">
        <tr>
          <td style="${cellStyleStr} width: 33.3333%"></td>
          <td style="${cellStyleStr} width: 33.3333%"></td>
          <td style="${cellStyleStr} width: 33.3333%"></td>
        </tr>
        </table>`,
    });
    bm.add('sect37', {
      label: opt.sect37BlkLabel,
      category: opt.categoryLabel,
      attributes: {class:'gjs-fonts gjs-f-b37'},
      content: `<table style="${tableStyleStr}">
        <tr>
          <td style="${cellStyleStr} width:30%"></td>
          <td style="${cellStyleStr} width:70%"></td>
        </tr>
        </table>`,
    });
    bm.add('divider', {
      label: opt.dividerBlkLabel,
      category: opt.categoryLabel,
      content: `<table style="width: 100%; margin-top: 10px; margin-bottom: 10px;">
        <tr>
          <td class="divider"></td>
        </tr>
      </table>
      <style>
      .divider {
        background-color: rgba(0, 0, 0, 0.1);
        height: 1px;
      }
      </style>`,
      attributes: {class:'gjs-fonts gjs-f-divider'}
    });
    bm.add('text', {
      label: opt.textBlkLabel,
      category: opt.categoryLabel,
      attributes: {class:'gjs-fonts gjs-f-text'},
      content: {
       type: 'text',
       content: 'Insert your text here',
       style: { padding: '10px' },
       activeOnRender: 1
      },
    });
    bm.add('text-sect', {
      label: opt.textSectionBlkLabel,
      category: opt.categoryLabel,
      content: '<h1 class="heading">Insert title here</h1><p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>',
      attributes: {class:'gjs-fonts gjs-f-h1p'}
    });
    bm.add('image', {
      label: opt.imageBlkLabel,
      category: opt.categoryLabel,
      attributes: {class:'gjs-fonts gjs-f-image'},
      content: {
        type:'image',
        style: {color:'black'},
        activeOnRender: 1
      },
    });
    bm.add('quote', {
      label: opt.quoteBlkLabel,
      category: opt.categoryLabel,
      content: '<blockquote class="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit</blockquote>',
      attributes: {class:'fa fa-quote-right'}
    });
    bm.add('link', {
      label: opt.linkBlkLabel,
      category: opt.categoryLabel,
      attributes: {class:'fa fa-link'},
      content: {
        type: 'link',
        content: 'Link',
        style: {color:'#3b97e3'}
      },
    });

    bm.add('unEditableText', {
        label: 'Un-Editable',
        category: 'Read-Only Blocks',
        attributes: {class:'gjs-fonts gjs-f-text'},
        content: {
            title: 'Insert the iteration here',
            type: 'text',
            content: `<span contenteditable="false">If there are any mistakes 
     or changes required to the above please 
     contact us as soon as possible on</span> {{CALLCENTRENUMBER}} <span contenteditable="false">
     and quote your reference which is {{CUSTOMERREF}}. You can also contact us via our website at <OURWEBSITE> particularly if you should have a change of address or contact phone numbers during the term of your contract.</span>`,
            style: { padding: '10px' },
            //activeOnRender: 1
        },
    });

    bm.add('paymentDetails', {
        label: 'Payment Details',
        //category: opt.categoryLabel,
        category: 'Iterations',
        attributes: {class:'gjs-fonts gjs-f-text'},
        content: {
            title: 'Insert the iteration here',
            type: 'text',
            content: `<span contenteditable="false"><div>
     {% for payment in paymentDetails %}
         <div>{{ payment.date }}</div>
         <div>{{ payment.ref }}</div>
         {% else %}
         <p> No payment details available against the account number. </p>
     {% endfor %}
     </div></span>`,
            style: { padding: '10px' },
            activeOnRender: 0
        },
    });

    rte.add('mergeTags', {
        icon: `<select class="gjs-field">
                <option value="">- Select -</option>
            <option value="<span contenteditable='false'>[[firstname]]</span>">FirstName</option>
            <option value="[[ ]]">LastName</option>
            <option value="[[age]]">Age</option>
        </select>`,
        // Bind the 'result' on 'change' listener
        event: 'change',
        result: (rte, action) => rte.insertHTML(action.btn.firstChild.value),
        // Reset the select on change
        update: (rte, action) => { action.btn.firstChild.value = ""; }
    });

    /*
    rte.add('fontSize', {
        icon: `<select class="gjs-field">
      <option>1</option>
      <option>4</option>
      <option>7</option>
    </select>`,
        // Bind the 'result' on 'change' listener
        event: 'change',
        result: (rte, action) => rte.exec('fontSize', action.btn.firstChild.value),
        // Callback on any input change (mousedown, keydown, etc..)
        update: (rte, action) => {
            const value = rte.doc.queryCommandValue(action.name);
            if (value != 'false') { // value is a string
                action.btn.firstChild.value = value;
            }
        }
    });


    */
  };
})
