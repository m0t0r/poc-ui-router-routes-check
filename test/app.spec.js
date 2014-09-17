"use strict";

describe('Simple route checker', function() {

  var SecurityManager, $state, $rootScope, $httpBackend;

  beforeEach(module("myApp"));

  beforeEach(inject(function(_SecurityManager_, _$state_, _$rootScope_, _$httpBackend_) {
    SecurityManager = _SecurityManager_;
    $state = _$state_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_
  }));

  beforeEach(function() {
    $httpBackend.expectGET('src/templates/index.html').respond(200);
    $rootScope.$digest();
    $state.go('index');
    $httpBackend.flush();
    $rootScope.$apply();
  });


  it('has to be able to correctly resolve routes for an admin',function() {
    expect($state.current.name).toBe('index');
    SecurityManager.setRole('admin');
    $state.go('admin');
    $httpBackend.expectGET('src/templates/admin.html').respond(200);
    $httpBackend.flush();
    $rootScope.$apply();
    expect($state.current.name).toBe('admin');
  });

  it('has to be able to correctly resolve routes for a user',function() {
    expect($state.current.name).toBe('index');
    SecurityManager.setRole('user');
    $state.go('admin');
    $httpBackend.expectGET('src/templates/admin.html').respond();
    $httpBackend.flush();
    $rootScope.$apply();
    expect($state.current.name).toBe('index');
    expect($state.current.name).not.toBe('admin');
  });


});