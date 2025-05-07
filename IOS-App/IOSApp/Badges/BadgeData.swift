import Foundation

// Badge struct with non-optional 'obtained' field
struct Badge: Codable, Identifiable {
    let id: Int
    let title: String
    let description: String
    let imageURL: String
    let obtained: Bool // Non-optional
}

class BadgeLoader {
    static func loadBadges() -> [Badge] {
        print("📦 BadgeLoader: Loading badges from embedded JSON...")

        let json = """
        [
            {
                "id": 1,
                "title": "Badge 1",
                "description": "Description for Badge 1",
                "imageURL": "https://example.com/image1.png",
                "obtained": true
            },
            {
                "id": 2,
                "title": "Badge 2",
                "description": "Description for Badge 2",
                "imageURL": "https://example.com/image2.png",
                "obtained": false
            },
            {
                "id": 3,
                "title": "Badge 3",
                "description": "Description for Badge 3",
                "imageURL": "https://example.com/image3.png",
                "obtained": true
            },
            {
                "id": 4,
                "title": "Badge 4",
                "description": "Description for Badge 4",
                "imageURL": "https://example.com/image4.png",
                "obtained": false
            }
        ]
        """
        
        guard let data = json.data(using: .utf8) else {
            print("❌ Error: Invalid JSON string.")
            return []
        }

        do {
            let decoded = try JSONDecoder().decode([Badge].self, from: data)
            
            print("✅ BadgeLoader: Successfully decoded \(decoded.count) badges.")
            
            for badge in decoded {
                print(" - \(badge.id): \(badge.title), obtained: \(badge.obtained)")
            }

            return decoded
        } catch {
            print("❌ BadgeLoader: JSON decoding failed with error: \(error)")
            return []
        }
    }
}
