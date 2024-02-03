{ let t = function () { let t = $("#new-post-form"); t.submit((function (o) { o.preventDefault(), $.ajax({ type: "post", url: "/posts/create", data: t.serialize(), success: function (t) { let o = e(t.data.post); $("#posts-list-container>ul").prepend(o), n($(" .delete-post-button", o)), new PostComments(t.data.post._id), new ToggleLike($(" .toggle-like-button", o)), new Noty({ theme: "relax", text: "Post published!", type: "success", layout: "topRight", timeout: 1500 }).show() }, error: function (t) { console.log(t.responseText) } }) })) }, e = function (t) {  return $(`<li id="post-${post._id}" class="post-container">
<section class="full-post">
    <a href=${/users/profile / post.user.id} %>">
        <img src=${post.user.avatar}" alt="${post.user.name}" width="25" height="25" style="border-radius: 50%; margin-right: 10px;">
 
    <p class="post-user-info">${post.user.name}</p>
   
    <p class="post-content">${post.content}
        
    <!--checking if current logged in user id with the user id who created the post-->
    <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
    
    </p>
    
    <small class="like-content">
                    
    <a class="toggle-like-button" data-likes="${post.likes.length}" href="/likes/toggle/?id=${post._id}&type=Post">
            f(post.likes.some(like => like.user.toString() === locals.user.id)) {
                <i class="fas fa-thumbs-down"></i>
            }else {
                <i class="fas fa-thumbs-up"></i>
             }
            ${post.likes.length} Likes
        </a>
    <a class="toggle-like-button" toggle-like="false" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
    <i class="fas fa-thumbs-up"></i>  0 likes  
    
    </a>

    </small>
</section>    

    

    

    <div class="post-comments">
        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
                <!-- here 'post' in 'post.comment' is the iterating  varible in the above for loop-->
        
            </ul>
        </div>
     
 

        <form action="/comments/create" id="post-<%= post._id %>-comments-form" method="POST">
            <input type="text" name="content" placeholder="Type here to add a comment..." required>
               <!-- sending the id of the post below which comment needs to be added -->
                <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="Add Comment">

        </form>

   
        
    </div>
        </li>`)  }, n = function (t) { $(t).click((function (e) { e.preventDefault(), $.ajax({ type: "get", url: $(t).prop("href"), success: function (t) { $("#post-" + t.data.post_id).remove(), new Noty({ theme: "relax", text: "Post Deleted", type: "success", layout: "topRight", timeout: 1500 }).show() }, error: function (t) { console.log(t.responseText) } }) })) }, o = function () { $("#posts-list-container>ul>li").each((function () { let t = $(this), e = $(" .delete-post-button", t); n(e); let o = t.prop("id").split("-")[1]; new PostComments(o) })) }; t(), o() }