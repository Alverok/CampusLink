import 'package:flutter/foundation.dart';

class ClassroomProvider with ChangeNotifier {
  // Classroom availability: Map<"S001_2024-11-12_9:00-9:50", bool>
  final Map<String, bool> _bookings = {};

  // Get availability for specific date and time
  List<String> getAvailableClassrooms(String date, String timeSlot) {
    final allClassrooms = [
      'S001', 'S002', 'S003', 'S004', 'S005', 'S006',
      'S007', 'S008', 'S009', 'S010', 'S011', 'S012',
      'N001', 'N002', 'N003', 'N004', 'N005', 'N006',
      'N007', 'N008', 'N009', 'N010', 'N011', 'N012',
    ];

    return allClassrooms.where((classroom) {
      final key = '${classroom}_${date}_$timeSlot';
      return !(_bookings[key] ?? false); // Not booked = available
    }).toList();
  }

  // Book a classroom
  bool bookClassroom({
    required String classroom,
    required String date,
    required String timeSlot,
    required String teacherName,
  }) {
    final key = '${classroom}_${date}_$timeSlot';
    
    if (_bookings[key] == true) {
      return false; // Already booked
    }
    
    _bookings[key] = true;
    notifyListeners();
    return true;
  }

  // Check if classroom is booked
  bool isBooked(String classroom, String date, String timeSlot) {
    final key = '${classroom}_${date}_$timeSlot';
    return _bookings[key] ?? false;
  }

  // Get teacher's bookings
  List<Map<String, dynamic>> getTeacherBookings() {
    // In real app, filter by teacher ID
    return [];
  }
}
