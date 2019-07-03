!function(){
    var view=document.querySelector('section.message')

    var model={
        //获取数据
        init:function(){
            var APP_ID = 'ccFrNOWfVvznB3jVaAR3D9LS-gzGzoHsz';
            var APP_KEY = 'bJNJepBXn0L3lssSqv03zgaE';
            AV.init({appId: APP_ID,appKey: APP_KEY});
            // let initMssage={
            //     Tom:'233',
            //     May:'666'
            // }
            // localStorage.setItem('message', JSON.stringify(initMssage));
        },
        fetch:function(){
            var query = new AV.Query('Message');
            var now=new Date()
            query.lessThanOrEqualTo('createdAt', now);//查询今天之前创建的 Todo
            query.limit(3);
            query.descending('createdAt');
            return query.find()//promise对象
            // let cat = localStorage.getItem('message');
        },
        //创建数据
        save:function(name,content){
            let Message=AV.Object.extend('Message');
            let message=new Message();
            return message.save({
                content:content,
                name:name
            })//promise对象

        }
    }//跟数据有关的用model

    var controller={
        view:null,
        messageList:null,
        model:null,
        form:null,
        init:function(view,model){
            this.view=view
            this.model=model   
            this.messageList=view.querySelector('#messageList')
            this.form=view.querySelector('#postMessageForm')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages:function(){            
            this.model.fetch().then( (messages) => {
                        let array=messages.map((item)=>item.attributes)
                        if(this.messageList.hasChildNodes()){
                            var children=this.messageList.childNodes;  
                            for(var i=children.length-1;i>=0;i--){  
                                this.messageList.removeChild(children.item(i));  
                            } 
                            array.forEach((item)=>{
                                let li=document.createElement('li')
                                li.innerText=`${item.name}:${item.content}`;
                               this.messageList.appendChild(li);
                            }) 
                        }else{
                            array.forEach((item)=>{
                                let li=document.createElement('li')
                                li.innerText=`${item.name}:${item.content}`;
                               this.messageList.appendChild(li);
                            }) 
                        }
                           
                    },
                
                )
                // .then(()=>{},(error)=>{
                //     console.log(error)
                // })
        },
        bindEvents:function(){
            this.form.addEventListener('submit',(e)=>{
                e.preventDefault();
                this.saveMessage()
                this.loadMessages()
               
            })
            
        },
        saveMessage:function(){
            let myForm=this.form                
            let content=myForm.querySelector('input[name=content]').value;
            let name=myForm.querySelector('input[name=name]').value;
            this.model.save(name,content)
            //  .then(function(object){
            //     let li=document.createElement('li')
            //     li.innerText=`${object.attributes.name}:${object.attributes.content}`;
            //     let messageList=document.querySelector('#messageList')
            //     messageList.appendChild(li);
            //     myForm.querySelector('input[name=content]').value=""
            //     myForm.querySelector('input[name=name]').value=""
            // })
            
        }
    }
    controller.init(view,model);

    // $('.submit').click([name,content],function(){

    // })
}.call()








// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })


//

// var xhr=new XMLHttpRequest()
// xhr.open()





