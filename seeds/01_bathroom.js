
exports.seed = function(knex, Promise) {
  return knex('bathroom').del()
    .then(function () {
      return knex('bathroom').insert([{
        id: 1,
        establishment_name: 'Galvanize - Platte',
        address: 'Address: 1644 Platte St, Denver, CO 80202',
        photo_url: 'https://fthmb.tqn.com/GS3EY1zFiLBco2DqtAxy5nq8s0s=/640x428/filters:no_upscale():fill(transparent,1)/traditional-bathroom-opener-589dabfe3df78c47585733ce.jpg',
        description: 'Nice place to dump, comfortable, relaxing, hassle free',
        rating: 8.9
      }, {
        id: 2,
        establishment_name: 'Safeway',
        address: '2150 S Downing St, Denver, CO 80210',
        photo_url: 'http://uglyhousephotos.com/wordpress/wp-content/uploads/2016/02/160207northridgeca4.jpg',
        description: 'No bueno, I think someone was murdered in here',
        rating: 1.5
      }, {
        id: 3,
        establishment_name: 'Brown Palace Hotel',
        address: '321 17th St, Denver, CO 80202',
        photo_url: 'http://www.factsonline.co/wp-content/uploads/2018/01/nice-bathroom-designs-elegant-nice-bathroom-designs-home-design-ideas-wellsuited-bathrooms-of-nice-bathroom-designs.jpg',
        description: 'Absolutely loved pooping here! Will most def recomend to friends!!',
        rating: 9.4
      }, {
        id: 4,
        establishment_name: 'Dillon\'s House',
        address: '69420 High St, Denver, CO 80202',
        photo_url: 'http://static.thefrisky.com/uploads/2013/04/12/toilet--400x470.jpg',
        description: 'Had a kind of skunky smell, but I felt pretty good after I left, like really good, where can I get some popsicles? and Cheetos!! ohhh yeaaaaa',
        rating: 5.5
      }, {
        id: 5,
        establishment_name: '7-Eleven',
        address: '567 E Louisiana Ave, Denver, CO 80210',
        photo_url: 'http://barfblog.com/wp-content/uploads/2013/07/DSC05623.jpg',
        description: 'Meh.',
        rating: 3.8
      }]);
    })
    .then(() => {
      return knex.raw('ALTER SEQUENCE bathroom_id_seq RESTART WITH 6;');
    })
};
