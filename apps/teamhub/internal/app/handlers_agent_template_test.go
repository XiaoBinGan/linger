package app

import (
	"strings"
	"testing"

	"github.com/simplexai-labs/linger/apps/teamhub/internal/platform/agenttemplates"
)

func TestValidAgentTemplateTextCountsCharacters(t *testing.T) {
	t.Parallel()

	han := strings.Repeat("\u6c49", agenttemplates.MaxInstructionsRunes)
	if !validAgentTemplateText("Template", han) {
		t.Fatal("instructions of 50000 characters must be valid")
	}
	if validAgentTemplateText("Template", han+"\u6c49") {
		t.Fatal("instructions of 50001 characters must be rejected")
	}
	if !validAgentTemplateText("Template", strings.Repeat("t", 50000)) {
		t.Fatal("the ASCII bound must stay 50000 characters")
	}
	name := strings.Repeat("\u6c49", agentTemplateNameRunes)
	if !validAgentTemplateText(name, "Do the work.") {
		t.Fatal("a template name of 120 characters must be valid")
	}
	if validAgentTemplateText(name+"\u6c49", "Do the work.") {
		t.Fatal("a template name of 121 characters must be rejected")
	}
	if validAgentTemplateText("  ", "Do the work.") || validAgentTemplateText("Template", "  ") {
		t.Fatal("a blank name or instructions must be rejected")
	}
}
