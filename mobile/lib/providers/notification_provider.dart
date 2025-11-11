import 'package:flutter/foundation.dart';

class NotificationProvider with ChangeNotifier {
  List<Map<String, dynamic>> _notifications = [
    {
      'id': '1',
      'title': 'Urgent: Exam Schedule Released',
      'date': 'Nov 11, 2024',
      'message': 'Mid-semester examination schedule has been released. Check your timetable now!',
      'isLiked': false,
      'priority': 'high',
    },
    {
      'id': '2',
      'title': 'Assignment Deadline Extended',
      'date': 'Nov 10, 2024',
      'message': 'The deadline for Database Management System assignment has been extended to Nov 15, 2024.',
      'isLiked': true,
      'priority': 'high',
    },
    {
      'id': '3',
      'title': 'Campus Event: Tech Fest 2024',
      'date': 'Nov 9, 2024',
      'message': 'Annual Tech Fest is scheduled for Nov 20-22. Register now to participate in exciting competitions!',
      'isLiked': true,
      'priority': 'normal',
    },
    {
      'id': '4',
      'title': 'Library Notice',
      'date': 'Nov 8, 2024',
      'message': 'Library will remain open 24/7 during exam week. Please maintain silence in reading areas.',
      'isLiked': false,
      'priority': 'normal',
    },
    {
      'id': '5',
      'title': 'New Course Material Available',
      'date': 'Nov 7, 2024',
      'message': 'Prof. Smith has uploaded new lecture notes for Machine Learning. Check the classroom section.',
      'isLiked': true,
      'priority': 'normal',
    },
    {
      'id': '6',
      'title': 'Hostel Maintenance Notice',
      'date': 'Nov 6, 2024',
      'message': 'Water supply will be interrupted on Nov 12 from 10 AM to 2 PM for maintenance work.',
      'isLiked': false,
      'priority': 'high',
    },
  ];

  List<Map<String, dynamic>> get notifications => _notifications;
  
  List<Map<String, dynamic>> get highPriorityNotifications =>
      _notifications.where((n) => n['priority'] == 'high').toList();
  
  List<Map<String, dynamic>> get likedNotifications =>
      _notifications.where((n) => n['isLiked'] == true).toList();

  // Toggle like/unlike
  void toggleLike(String id) {
    final index = _notifications.indexWhere((n) => n['id'] == id);
    if (index != -1) {
      _notifications[index]['isLiked'] = !_notifications[index]['isLiked'];
      notifyListeners();
    }
  }

  // Add notification (for teachers/admin)
  void addNotification({
    required String title,
    required String message,
    required String priority,
  }) {
    _notifications.insert(0, {
      'id': DateTime.now().millisecondsSinceEpoch.toString(),
      'title': title,
      'date': DateTime.now().toString().split(' ')[0],
      'message': message,
      'isLiked': false,
      'priority': priority,
    });
    notifyListeners();
  }
}
