import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class EventProvider with ChangeNotifier {
  List<Map<String, dynamic>> _events = [
    {
      'id': '1',
      'title': 'Tech Fest 2024',
      'date': 'Nov 20-22, 2024',
      'time': '9:00 AM - 6:00 PM',
      'location': 'Main Auditorium',
      'color': const Color(0xFF7AB8F7),
    },
    {
      'id': '2',
      'title': 'Guest Lecture: AI & ML',
      'date': 'Nov 15, 2024',
      'time': '2:00 PM - 4:00 PM',
      'location': 'Room S201',
      'color': const Color(0xFF9B59B6),
    },
    {
      'id': '3',
      'title': 'Sports Day',
      'date': 'Nov 25, 2024',
      'time': '8:00 AM - 5:00 PM',
      'location': 'Sports Ground',
      'color': const Color(0xFFE74C3C),
    },
    {
      'id': '4',
      'title': 'Cultural Night',
      'date': 'Nov 30, 2024',
      'time': '6:00 PM - 10:00 PM',
      'location': 'Open Air Theatre',
      'color': const Color(0xFFF39C12),
    },
  ];

  List<Map<String, dynamic>> get events => _events;

  // Add event (for admin/teachers)
  void addEvent({
    required String title,
    required String date,
    required String time,
    required String location,
    Color color = const Color(0xFF7AB8F7),
  }) {
    _events.insert(0, {
      'id': DateTime.now().millisecondsSinceEpoch.toString(),
      'title': title,
      'date': date,
      'time': time,
      'location': location,
      'color': color,
    });
    notifyListeners();
  }
}
