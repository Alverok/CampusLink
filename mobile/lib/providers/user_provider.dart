import 'package:flutter/foundation.dart';

class UserProvider with ChangeNotifier {
  String _role = 'student'; // 'student' or 'teacher'
  String _name = 'John Doe';
  String _email = '';
  String _rollNumber = '';
  bool _isAuthenticated = false;

  // Getters
  String get role => _role;
  String get name => _name;
  String get email => _email;
  String get rollNumber => _rollNumber;
  bool get isAuthenticated => _isAuthenticated;
  bool get isTeacher => _role == 'teacher';
  bool get isStudent => _role == 'student';

  // Login
  void login({
    required String role,
    required String name,
    required String email,
    String? rollNumber,
  }) {
    _role = role;
    _name = name;
    _email = email;
    _rollNumber = rollNumber ?? '';
    _isAuthenticated = true;
    notifyListeners(); // Updates all widgets listening to this
  }

  // Logout
  void logout() {
    _role = 'student';
    _name = '';
    _email = '';
    _rollNumber = '';
    _isAuthenticated = false;
    notifyListeners();
  }

  // Update profile
  void updateProfile({String? name, String? email}) {
    if (name != null) _name = name;
    if (email != null) _email = email;
    notifyListeners();
  }
}
