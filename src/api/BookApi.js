// Generate a unique token for storing your bookshelf data on the backend server. Or you can try to set a custom token
if (!localStorage.token) {
  localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}
class Helper {
  static baseURL() {
    return "https://book.apie.xyz";
  }
  static headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.token
    };
  }

  /**
   * Simplifies the api request
   * @param urlQuery
   * @param method
   * @param sendData
   * @returns {Promise<Response | never>}
   */
  static simpleFetch(urlQuery, method, sendData) {
    let requestData = {
      method,
      headers: Helper.headers(),
      body: JSON.stringify(sendData)
    };
    if (method === "GET") delete requestData.body;
    return fetch(`${Helper.baseURL()}${urlQuery}`, requestData).then(res => {
      return res.json();
    });
  }
}

export default class BookApi {
  /**
   * Look up book by volumeID.
   * @param {String} volumeID
   * @returns {*}
   */
  static lookup(volumeID) {
    return Helper.simpleFetch("/books/lookup", "POST", { volumeID });
  }

  /**
   * Search by query. And optional options for advanced searching
   * @param {String} query
   * @param {Object} options
   * @returns {*}
   */
  static async search(query, options) {
    if (query !== "") {
      return Helper.simpleFetch(
        "/books/search",
        "POST",
        Object.assign({ query }, options)
      );
    }
  }

  /**
   * Add a new book to shelf. Use move() after adding
   * @param {String} volumeID
   * @param {String} shelf - currentlyReading,read,wantToRead
   * @returns {*}
   */
  static add(volumeID, shelf) {
    return Helper.simpleFetch(
      "/books/add",
      "POST",
      Object.assign({ volumeID }, { shelf })
    );
  }

  /**
   * Get books for bookshelfs currentlyReading,read,wantToRead. Only returns 6 books for each shelf.
   * To Get rest of books use the shelf() request
   * @returns {*}
   */
  static getBooks() {
    return Helper.simpleFetch("/books/", "GET");
  }

  /**
   * Returns only books from a certain shelf.
   * @param {String} shelf - currentlyReading,read,wantToRead
   * @param {Number} page - 1/nTH
   * @returns {*}
   */
  static shelf(shelf, page) {
    return Helper.simpleFetch(
      "/books/shelf",
      "POST",
      Object.assign({ shelf }, { page })
    );
  }

  /**
   * Moves a book from a shelf to another
   * @param {String} volumeID
   * @param {String} shelf - currentlyReading,read,wantoRead
   * @returns {*}
   */
  static move(volumeID, shelf) {
    return Helper.simpleFetch(
      "/books/move",
      "PUT",
      Object.assign({ volumeID }, { shelf })
    );
  }

  /**
   * Rates a book. Once rated you can access the userRating from the book object.
   * @param {String} volumeID
   * @param {Number} rating - 1 through 5
   * @returns {*}
   */
  static rate(volumeID, rating) {
    return Helper.simpleFetch(
      "/books/rate",
      "POST",
      Object.assign({ volumeID }, { rating })
    );
  }

  /**
   * Request to get a user generated token or a server generated token.
   * There is no need for this as long as you put any thing inside the Authorization header
   * @param token
   * @returns {*}
   */
  static getToken(token = "") {
    return Helper.simpleFetch("/token/get", "POST", { token });
  }
}
