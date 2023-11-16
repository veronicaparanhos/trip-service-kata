"use strict";

let UserSession = require("./UserSession");
let TripDAO = require("./TripDAO");

class TripService {
  isFriend(user, loggedUser) {
    let friends = user.getFriends();
    return friends.filter((friend) => friend === loggedUser);
  }

  getTripsByUser(user) {
    let tripList = [];
    let loggedUser = UserSession.getLoggedUser();

    if (loggedUser != null) {
      let isFriend = this.isFriend(user, loggedUser);

      if (isFriend) {
        tripList = TripDAO.findTripsByUser(user);
      }

      return tripList;
    } else {
      throw new Error("User not logged in.");
    }
  }
}

module.exports = TripService;
