import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import OutCall "http-outcalls/outcall";

actor {
  // Scheme type
  type Scheme = {
    id : Text;
    name : Text;
    state : Text;
    category : Text;
    benefit : Text;
    benefitAmountNumeric : Nat;
    eligibility : Text;
    documents : Text;
    applyLink : Text;
    description : Text;
    tags : [Text];
  };

  module Scheme {
    public func compare(scheme1 : Scheme, scheme2 : Scheme) : Order.Order {
      Text.compare(scheme1.id, scheme2.id);
    };
  };

  // Password verification
  func verifyAdmin(password : Text) : () {
    if (password != "admin123") {
      Runtime.trap("Invalid admin password");
    };
  };

  // Internal scheme storage
  let schemes = Map.empty<Text, Scheme>();
  var nextId = 1;

  // Add new scheme (admin only)
  func addSchemeInternal(schemeInput : Scheme) : () {
    let scheme = {
      schemeInput with id = nextId.toText();
    };
    schemes.add(nextId.toText(), scheme);
    nextId += 1;
  };

  // HTTP Outcall transform function
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // GET request to OpenRouter API
  func openRouterGetRequest(prompt : Text) : async Text {
    let url = "api.openrouter.ai" # prompt # ".json";
    let headers = [
      { name = "Authorization"; value = "Bearer apikey-" },
      { name = "Content-Type"; value = "application/json" },
    ];
    await OutCall.httpGetRequest(url, headers, transform);
  };

  // GET all schemes
  public query ({ caller }) func getAllSchemes() : async [Scheme] {
    schemes.values().toArray().sort();
  };

  // Get scheme by ID
  public query ({ caller }) func getSchemeById(id : Text) : async Scheme {
    switch (schemes.get(id)) {
      case (null) { Runtime.trap("Scheme does not exist") };
      case (?scheme) { scheme };
    };
  };

  // Add new scheme (admin only)
  public shared ({ caller }) func addScheme(scheme : Scheme, password : Text) : async () {
    verifyAdmin(password);
    addSchemeInternal(scheme);
  };

  // Update scheme (admin only)
  public shared ({ caller }) func updateScheme(scheme : Scheme, password : Text) : async () {
    verifyAdmin(password);
    switch (schemes.get(scheme.id)) {
      case (null) { Runtime.trap("Scheme does not exist") };
      case (?_) { schemes.add(scheme.id, scheme) };
    };
  };

  // Delete scheme (admin only)
  public shared ({ caller }) func deleteScheme(id : Text, password : Text) : async () {
    verifyAdmin(password);
    if (not schemes.containsKey(id)) {
      Runtime.trap("Scheme does not exist");
    };
    schemes.remove(id);
  };

  // Query schemes by category
  public query ({ caller }) func getSchemesByCategory(category : Text) : async [Scheme] {
    schemes.values().toArray().map(func(s) { s });
  };

  // Query schemas by state
  public query ({ caller }) func getSchemesByState(state : Text) : async [Scheme] {
    schemes.values().toArray().map(func(s) { s });
  };

  // Query by tags
  public query ({ caller }) func getSchemesByTag(tag : Text) : async [Scheme] {
    let filtered = schemes.values().toArray().map(func(s) { s });
    filtered;
  };

  // Get AI suggestion
  public shared ({ caller }) func getAISuggestion(prompt : Text) : async Text {
    await openRouterGetRequest(prompt);
  };
};
