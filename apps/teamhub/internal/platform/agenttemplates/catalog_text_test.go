package agenttemplates

import (
	"strings"
	"testing"
)

func TestInstructionsBoundCountsCharacters(t *testing.T) {
	t.Parallel()

	base := Template{
		TemplateID:   "example",
		Name:         "Example",
		Instructions: "Do the work.",
		AvatarKey:    "",
	}
	han := strings.Repeat("\u6c49", MaxInstructionsRunes)
	candidate := base
	candidate.Instructions = han
	if err := validate(&candidate, "example.json"); err != nil {
		t.Fatalf("instructions of %d characters must be valid: %v", MaxInstructionsRunes, err)
	}
	candidate.Instructions = han + "\u6c49"
	if err := validate(&candidate, "example.json"); err == nil {
		t.Fatal("instructions of one character more must be rejected")
	}
	candidate.Instructions = strings.Repeat("t", MaxInstructionsRunes)
	if err := validate(&candidate, "example.json"); err != nil {
		t.Fatalf("the ASCII bound must stay %d characters: %v", MaxInstructionsRunes, err)
	}
}
