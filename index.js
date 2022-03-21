 const Hapi=require('@hapi/hapi')  ;



var connection=require('./connection.js') ;

 const init=async()=>{


   const server=Hapi.server({
       port:3000 ,
       host:'localhost'
   })
 
   connection.connect(err => {
    if (!err) {
      console.log("DB Connection Succeeded");
    } else {
      console.log(err);
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        
         
  try{ 
       let records= await connection.promise().query('select * from students') ;
        console.log(records)
        return records[0] ;
    }
    catch(err){
        console.log(err)
    }
}
});




server.route({
    method: 'GET',
    path: '/{key}/{value}',
    handler: async (request, h) => {
        
         
  try{ 
       console.log(request.params.key) ;
       console.log(request.params.value) ;

       let sql=`select * from students where ${request.params.key} = `+ connection.escape(request.params.value)+" " ;
          let records=await connection.promise().query(sql)
       console.log(sql)
   


       return records[0] ;
    }
    catch(err){
        console.log(err)
    }
}
});














server.route({
    method: 'POST',
    path: '/add',
    handler: async (request, h) => {

     
      console.log(request.payload.name) ;
      console.log(request.payload.age) ;
     try{

        let id=request.payload.id;
        let first=request.payload.first ;
        let last=request.payload.last ;
        let city=request.payload.city ;
        let age=request.payload.age ;

       
         let sql=`INSERT INTO students (id, first, last, city,age) VALUES (${id},"${first}", "${last}","${city}",${age})`;
         await connection.promise().query(sql) ;
       
        return "POST API" ;



     }
    catch(err){
      console.log(err) ;
    }


     


    }
});




server.route({
    method: 'PUT',
    path: '/',
    handler: async (request, h) => {
        try{ 
         let column=request.payload.column ;
         let prev=request.payload.prev ;
         let updated=request.payload.updated ;

           let sql=`UPDATE students SET ${column} = `+connection.escape(updated)+` WHERE ${column} = `+connection.escape(prev) ;
             await connection.promise().query(sql) ;
           return "PUT API" ;

        }

        catch(err){
            console.log(err)
        }



       
    }
});





server.route({
    method: 'DELETE',
    path: '/{key}/{value}',
    handler: async(request, h) => {
         try{ 
         
            let sql=`delete from students where ${request.params.key} = `+ connection.escape(request.params.value)+" " ;
         
            
           


        await connection.promise().query(sql) ;


        return "DELETE API";

         }

         catch(error){
             console.log(error)
         }

    }
});




  

      
     await server.start()  ;


   console.log('Server running on PORT %s',server.info.uri) ;

 } ;


 process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

 init() ;




