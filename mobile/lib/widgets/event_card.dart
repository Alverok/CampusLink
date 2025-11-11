import 'package:flutter/material.dart';

class EventCard extends StatelessWidget {
  final String title;
  final String date;
  final String time;
  final String location;
  final String imageUrl;
  final Color color;

  const EventCard({
    Key? key,
    required this.title,
    required this.date,
    required this.time,
    required this.location,
    this.imageUrl = '',
    this.color = const Color(0xFF7AB8F7),
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    
    return Container(
      width: screenWidth * 0.7,
      height: 240, // Fixed height to prevent overflow
      margin: const EdgeInsets.only(right: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            spreadRadius: 2,
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Event Image/Color Banner
          Container(
            height: 100, // Reduced from 120
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [color, color.withOpacity(0.7)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(16),
                topRight: Radius.circular(16),
              ),
            ),
            child: Stack(
              children: [
                // Event icon
                Positioned(
                  right: 16,
                  top: 16,
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.3),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(
                      Icons.event,
                      color: Colors.white,
                      size: 28,
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          // Event Details
          Padding(
            padding: const EdgeInsets.all(12), // Reduced from 16
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 16, // Reduced from 18
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF2C3E50),
                  ),
                  maxLines: 1, // Reduced from 2
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 8), // Reduced from 12
                Row(
                  children: [
                    Icon(Icons.calendar_today, size: 14, color: Colors.grey.shade600), // Reduced from 16
                    const SizedBox(width: 6), // Reduced from 8
                    Text(
                      date,
                      style: TextStyle(
                        fontSize: 13, // Reduced from 14
                        color: Colors.grey.shade700,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6), // Reduced from 8
                Row(
                  children: [
                    Icon(Icons.access_time, size: 14, color: Colors.grey.shade600), // Reduced from 16
                    const SizedBox(width: 6), // Reduced from 8
                    Text(
                      time,
                      style: TextStyle(
                        fontSize: 13, // Reduced from 14
                        color: Colors.grey.shade700,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6), // Reduced from 8
                Row(
                  children: [
                    Icon(Icons.location_on, size: 14, color: Colors.grey.shade600), // Reduced from 16
                    const SizedBox(width: 6), // Reduced from 8
                    Expanded(
                      child: Text(
                        location,
                        style: TextStyle(
                          fontSize: 13, // Reduced from 14
                          color: Colors.grey.shade700,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
