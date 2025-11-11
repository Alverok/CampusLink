import 'package:flutter/material.dart';

class TeacherActionsPage extends StatelessWidget {
  const TeacherActionsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        automaticallyImplyLeading: false,
        title: const Text(
          'Quick Actions',
          style: TextStyle(
            color: Color(0xFF2C3E50),
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Padding(
        padding: EdgeInsets.all(screenWidth * 0.05),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'What would you like to do?',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey.shade600,
              ),
            ),
            SizedBox(height: screenWidth * 0.05),
            
            // Book Classroom Card
            _buildActionCard(
              context: context,
              icon: Icons.meeting_room,
              iconColor: const Color(0xFF7AB8F7),
              title: 'Book Classroom',
              description: 'Reserve a classroom for your lecture or event',
              onTap: () {
                // TODO: Navigate to classroom booking
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Classroom booking - Coming soon!')),
                );
              },
            ),
            
            SizedBox(height: screenWidth * 0.04),
            
            // Create Event Card
            _buildActionCard(
              context: context,
              icon: Icons.event,
              iconColor: const Color(0xFF9B59B6),
              title: 'Create Event',
              description: 'Organize a new campus event or activity',
              onTap: () {
                // TODO: Navigate to create event
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Create event - Coming soon!')),
                );
              },
            ),
            
            SizedBox(height: screenWidth * 0.04),
            
            // Post Notification Card
            _buildActionCard(
              context: context,
              icon: Icons.notifications_active,
              iconColor: const Color(0xFFE74C3C),
              title: 'Post Notification',
              description: 'Send an important announcement to students',
              onTap: () {
                // TODO: Navigate to post notification
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Post notification - Coming soon!')),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionCard({
    required BuildContext context,
    required IconData icon,
    required Color iconColor,
    required String title,
    required String description,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: iconColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                icon,
                color: iconColor,
                size: 32,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF2C3E50),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    description,
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey.shade600,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios,
              color: Colors.grey.shade400,
              size: 20,
            ),
          ],
        ),
      ),
    );
  }
}
