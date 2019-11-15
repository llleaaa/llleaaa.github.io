$(function () {
    
    var key = 'AIzaSyBOan_hm4qED12KzJbemsKuHU3f-38Lvbg';
    var playlistId = 'PLWB-sLI81C12M612rq0ygdhHvyl1Y9ib7';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 25,
        playlistId: playlistId
        
    }

    loodVids();

    function loodVids() {
        $.getJSON(URL, options, function (data) {
            console.log(data);
            var id = data.items[0].snippet.resourceId.videoId;
            
            mainVid(id);
            resultsLoop(data);
            
        })
    }

    function mainVid(id) {
        $('.video-container').html(`
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer;  autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `);
    }

    function resultsLoop(data) {
        $.each(data.items, function(i, item){

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0,90);
            var vid = item.snippet.resourceId.videoId;

            $('.favoriate').append(`
                <div class="article" data-key="${vid}">
                <iframe class="video w100" width="180" height="104" src="//www.youtube.com/embed/${vid}" frameborder="0"></iframe>
                    <div class="details">
                        <h4>${title}</h4>
                        <p>${desc}</p>
                        <a class="delete" onclick="delete()"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                    </div>
                </div>
            `);
        });
    }
    $('.favoriate').on('click', '.article', function(){
        var id = $(this).attr('data-key');
        mainVid(id);
    });
});
