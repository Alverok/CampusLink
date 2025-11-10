import 'package:flutter/material.dart';

class AuthProvider extends ChangeNotifier {
  bool _signedIn = false;

  bool get signedIn => _signedIn;

  void setSignedIn(bool v) {
    _signedIn = v;
    notifyListeners();
  }
}
