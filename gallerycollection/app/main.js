console.log('this is main.js - exercise 4');

// doesn't work  - see error line 61

var PicModel = Backbone.Model.extend( {
  defaults: {
    url: "/photos/catmusig.jpg",
	caption: "default caption"
  }
} );

var Album = Backbone.Collection.extend({
//    className: "photo",
	url: "/backlift/data/photos",
    model: PicModel
});

// this is all now moved onto the data server - see notes 
//var photodata = [{url: "/photos/cat1.jpg", caption: "A cat 1."}, 
//                {url: "/photos/cat2.jpg", caption: "A cat 2."}, 
//                 {url: "/photos/cat3.jpg", caption: "A cat 3."},
//                 {url: "/photos/cat4.jpg", caption: "A cat 4."}, 
//           	     {url: "/photos/cat5.jpg", caption: "A cat 5."},
//                 {url: "/photos/cat6.jpg", caption: "A cat 6."}, 
//                 {url: "/photos/notcat.jpg", caption: "Not a cat."}];


var PhotoView = Backbone.View.extend({
  className: "photo",
  render: function() {
  this.$el.html(Handlebars.templates.photo(this.model.toJSON()));
//	console.log('this.model.toJSON in PhotoView.render');
//	console.log(this.model.toJSON());
    console.log(Handlebars.templates.photo(this.model.toJSON()));
    return this;
//    return Handlebars.templates.photo(this.model.toJSON());
  }
});

var AlbumView = Backbone.View.extend({
  render: function() {
    var self = this;
    this.collection.each(function(picmod) {
//	  console.log('in AlbumView each callback: picmod');
//	  console.log(picmod);
      var photoView = new PhotoView({model: picmod});
      self.$el.append(photoView.render().el);
    });
    return this;
  }
});

// orig
//var GalleryView = Backbone.View.extend({
//	render: function(photodata) {
//		var self = this;
//		_.each(photodata, function(photo) {
//			var photoView = new PhotoView();
//			self.$el.append(photoView.render(photo).el);
//		});
//		return this;
//	}
//});

$(document).ready(function(){
//   var photoCollection = new Album(photodata);
   var photoCollection = new Album();
   var photos = new AlbumView();
   photoCollection.fetch({success : function()
   {
   photos.collection = photoCollection;  

/*   console.log('photoCollection after fetch');
   console.log(photoCollection);
   console.log('photos.render:');
   console.log(photos.render());
   console.log('photos.render().el');
   console.log(photos.render().el);
   console.log('photos.render().$el');
   console.log(photos.render().$el);
*/   
//    success = photoCollection.fetch;
//     $("body").append(photos.render().el);
   $('.gallery').append(photos.render().el); 
   // 'div' was wrong, because every div will get the same thing appended.
   }
   });

});

