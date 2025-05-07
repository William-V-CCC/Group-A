import Foundation

struct Challenge: Codable, Identifiable {
    let id: Int  // Numeric ID from MySQL
    let title: String
    let detail: String
}

class ChallengeLoader {
    static func loadChallenges() -> [Challenge] {
        print("📦 Loading challenges from embedded JSON...")

        let json = """
        [
            { "id": 1, "title": "Challenge 1", "detail": "Detail for Challenge 1" },
            { "id": 2, "title": "Challenge 2", "detail": "Detail for Challenge 2" },
            { "id": 3, "title": "Challenge 3", "detail": "Detail for Challenge 3" },
            { "id": 4, "title": "Challenge 4", "detail": "Detail for Challenge 4" },
            { "id": 5, "title": "Challenge 5", "detail": "Detail for Challenge 5" },
            { "id": 6, "title": "Challenge 6", "detail": "Detail for Challenge 6" },
            { "id": 7, "title": "Challenge 7", "detail": "Detail for Challenge 7" },
            { "id": 8, "title": "Challenge 8", "detail": "Detail for Challenge 8" },
            { "id": 9, "title": "Challenge 9", "detail": "Detail for Challenge 9" },
            { "id": 10, "title": "Challenge 10", "detail": "Detail for Challenge 10" },
            { "id": 11, "title": "Challenge 11", "detail": "Detail for Challenge 11" },
            { "id": 12, "title": "Challenge 12", "detail": "Detail for Challenge 12" },
            { "id": 13, "title": "Challenge 13", "detail": "Detail for Challenge 13" },
            { "id": 14, "title": "Challenge 14", "detail": "Detail for Challenge 14" },
            { "id": 15, "title": "Challenge 15", "detail": "Detail for Challenge 15" }
        ]
        """

        guard let data = json.data(using: .utf8) else {
            print("❌ Error: Invalid JSON string.")
            return []
        }

        do {
            let decoded = try JSONDecoder().decode([Challenge].self, from: data)
            print("✅ Successfully decoded \(decoded.count) challenges.")
            for challenge in decoded {
                print(" - \(challenge.id): \(challenge.title)")
            }
            return decoded
        } catch {
            print("❌ JSON decoding failed with error: \(error)")
            return []
        }
    }
}
