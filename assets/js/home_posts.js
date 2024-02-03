{
    // method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}" class="post-container">
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
            <a class="toggle-like-button"  toggle-like="false" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
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
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function (deleteLink) {
        // click function used
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    }





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function () {
        $('#posts-list-container>ul>li').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}