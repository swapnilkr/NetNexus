module.exports.home = function(req,res)
{
    //creating and altering a cookie
    // console.log(req.cookies);
    // res.cookie('user_id',25);


 // return res.end(`<h1>Express is up for Codeial</h1>`);
 return res.render('home',{
     title:"Codeial home"
 });
}