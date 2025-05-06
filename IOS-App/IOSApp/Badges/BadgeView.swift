import SwiftUI

struct BadgeView: View {
    @State private var badges: [Badge] = []
    @State private var selectedBadgeID: Int?

    // Define 3 flexible columns
    private let columns = [
        GridItem(.flexible()),
        GridItem(.flexible()),
        GridItem(.flexible())
    ]

    var body: some View {
        ZStack {
            ScrollView {
                VStack(spacing: 20) {
                    Spacer().frame(height: 100) // Space for top bar

                    LazyVGrid(columns: columns, spacing: 20) {
                        ForEach(badges) { badge in
                            VStack {
                                Button(action: {
                                    selectedBadgeID = (selectedBadgeID == badge.id ? nil : badge.id)
                                }) {
                                    VStack(spacing: 8) {
                                        if let url = URL(string: badge.imageURL), !badge.imageURL.isEmpty {
                                            AsyncImage(url: url) { image in
                                                image.resizable()
                                                    .scaledToFit()
                                                    .frame(width: 80, height: 80)
                                                    .cornerRadius(10)
                                            } placeholder: {
                                                ProgressView()
                                            }
                                        } else {
                                            Text("\(badge.id)")
                                                .frame(width: 80, height: 80)
                                                .background(Color.blue.opacity(0.2))
                                                .cornerRadius(10)
                                        }

                                        Text(badge.title)
                                            .font(.caption)
                                            .multilineTextAlignment(.center)
                                            .frame(maxWidth: .infinity)
                                    }
                                    .padding()
                                    .background(badge.obtained ? Color.green.opacity(0.2) : Color.gray.opacity(0.1))
                                    .cornerRadius(12)
                                }

                                if selectedBadgeID == badge.id {
                                    Text(badge.description)
                                        .font(.caption)
                                        .padding(6)
                                        .background(Color.blue.opacity(0.05))
                                        .cornerRadius(8)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                }
                            }
                        }
                    }

                    Spacer().frame(height: 100) // Space for bottom bar
                }
                .padding()
            }

            // Top bar
            VStack {
                Color.blue
                    .frame(height: 100)
                    .ignoresSafeArea(edges: .top)
                Spacer()
            }

            // Bottom bar
            VStack {
                Spacer()
                Color.blue
                    .frame(height: 100)
                    .ignoresSafeArea(edges: .bottom)
            }
        }
        .onAppear {
            badges = BadgeLoader.loadBadges()
        }
    }
}

#Preview {
    BadgeView()
}
